import 'bootstrap/dist/css/bootstrap.css';
import BuildClient from '../api/buildClient';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Header {...currentUser} />
      <Component {...pageProps} />
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = new BuildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentUser');
  console.log(data);
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    currentUser: data,
  };
};

export default AppComponent;
