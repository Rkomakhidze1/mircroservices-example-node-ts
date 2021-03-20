import BuildClient from '../api/buildClient';

const Index = ({ currentUser }) => {
  return currentUser ? <h1>Landing Page</h1> : <h1>please login</h1>;
};

Index.getInitialProps = async (context) => {
  const client = new BuildClient(context);
  const { data } = await client.get('/api/users/currentUser');
  return data;
};

export default Index;
