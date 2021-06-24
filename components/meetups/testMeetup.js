const testMeetup = (props) => {
  const data = props.testData;

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      testData: "testdata",
    },
  };
};

export default testMeetup;
