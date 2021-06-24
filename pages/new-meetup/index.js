// our-domain.com/new-meetup

// react
import { Fragment } from "react";

// nextjs
import Head from "next/head";

import { useRouter } from "next/router";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const API_ROUTE_PATH = "/api/new-meetup";

    const response = await fetch(API_ROUTE_PATH, {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.replace("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add New</title>
        <meta
          name="description"
          content="Adding new entry on Leonardodo's NextJS"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
