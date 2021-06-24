// mongodb
import { MongoClient, ObjectId } from "mongodb";

// react
import { Fragment } from "react";

// nextJS
import Head from "next/head";

//
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  // const router = useRouter();

  // const meetupDetails = router.query.meetupId;
  // console.log(meetupDetails);

  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const dbPassword = process.env.DB_PASS;

  const client = await MongoClient.connect(
    `mongodb://leonard:${dbPassword}@cluster0-shard-00-00.qutsm.mongodb.net:27017,cluster0-shard-00-01.qutsm.mongodb.net:27017,cluster0-shard-00-02.qutsm.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-smk727-shard-0&authSource=admin&retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  console.log("HERE MEN!", meetups);

  client.close();

  const allPaths = meetups.map((meetup) => {
    return {
      params: {
        meetupId: meetup._id.toString(),
      },
    };
  });

  console.log("ALL_PATHS", allPaths);

  return {
    fallback: false,
    paths: allPaths,
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const dbPassword = process.env.DB_PASS;

  const client = await MongoClient.connect(
    `mongodb://leonard:${dbPassword}@cluster0-shard-00-00.qutsm.mongodb.net:27017,cluster0-shard-00-01.qutsm.mongodb.net:27017,cluster0-shard-00-02.qutsm.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-smk727-shard-0&authSource=admin&retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetupData = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  console.log(meetupId);

  console.log(meetupData);

  return {
    props: {
      meetupData: {
        image: meetupData.image,
        id: meetupData._id.toString(),
        title: meetupData.title,
        address: meetupData.address,
        description: meetupData.description,
      },
    },
  };
};

export default MeetupDetails;
