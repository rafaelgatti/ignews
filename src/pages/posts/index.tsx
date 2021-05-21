import Head from "next/head";

import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>21 de maio de 2021</time>
            <strong>Título do post</strong>
            <p>conteúdos do post</p>
          </a>
          <a href="#">
            <time>21 de maio de 2021</time>
            <strong>Título do post</strong>
            <p>conteúdos do post</p>
          </a>
          <a href="#">
            <time>21 de maio de 2021</time>
            <strong>Título do post</strong>
            <p>conteúdos do post</p>
          </a>
          <a href="#">
            <time>21 de maio de 2021</time>
            <strong>Título do post</strong>
            <p>conteúdos do post</p>
          </a>
        </div>
      </main>
    </>
  );
}