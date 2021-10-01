
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link'
import Layout from 'components/layout'
import { getAllPostIds, getPostById } from 'lib/posts';

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async (ctx) => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const postData = getPostById(params.id)

  return {
    props: {
      postData
    }
  }
}

export default function Post({
  postData
}) {
  // const router = useRouter()
  // const { id } = router.query

  return (
    <>
    <Layout>
      <Head>
        <title>{postData ? postData.title : "Post Details"}</title>
      </Head>


      {postData && (
        <>
          <Image src="/images/profile.jpeg" height={144} width={144} alt="profile" />
          <h1>{postData.title}</h1>
          <p>{postData.date}</p>
        </>
      )}


      <Link href="/">
        <a>Back to home</a>
      </Link>
    </Layout>
    </>
  )
}