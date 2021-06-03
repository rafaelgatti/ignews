import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";

import { getPrismicClient } from "../../../services/prismic";

import styles from '../post.module.scss';

type Post = {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}
interface PostPreviewProps {
  post: Post;
}

export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session?.activeSubscription){
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content}} />

            <div className={styles.continueReading}>
              Wanna continue reading?
              <Link href="/">
                <a>Subscribe now 🤗</a>            
              </Link>
            </div>
        </article>
      </main>
    </>
  );
}

//só existe em paginas que tem [] -> parametrização
// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [
//       { params: {slug: '10-apis-gratis-e-legais-para-voce-consumir' } }
//     ],
//     fallback: 'blocking',
//   }
// }

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {}); //somente 1 slug e nao o array

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.first_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  };

  return {
    props: {
      post
    },
    revalidate: 60 * 30,
  }
}