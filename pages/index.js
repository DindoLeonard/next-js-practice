// mongodb
import { MongoClient } from "mongodb";

// react
import { Fragment } from "react";

//next
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Leonardodo?</title>
        <meta name="description" content="Practicing NextJS app" />
      </Head>
      <MeetupList meetups={props.meetups.reverse()} />
    </Fragment>
  );
};

// STATIC SITE GENERATORS (SSG)
export const getStaticProps = async () => {
  // fetchData

  const dbPassword = process.env.DB_PASS;

  const client = await MongoClient.connect(
    `mongodb://leonard:${dbPassword}@cluster0-shard-00-00.qutsm.mongodb.net:27017,cluster0-shard-00-01.qutsm.mongodb.net:27017,cluster0-shard-00-02.qutsm.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-smk727-shard-0&authSource=admin&retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetupsData = await meetupsCollection.find().toArray();

  console.log("ALL_DATA", meetupsData);

  // always return an Object
  return {
    props: {
      meetups: meetupsData.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          description: meetup.description,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
};

export default HomePage;

// SERVER SIDE RENDERING (SSR)

// export const getServerSideProps = async (context) => {
//   // to access request and response on server
//   const req = context.req;
//   const res = context.res;

//   // fetchData

//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//     },
//   };
// };

// export default HomePage;

// https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg
