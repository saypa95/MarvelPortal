import { Helmet } from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import Banner from "../banner/Banner";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of our comics" />
        <title>Comics page</title>
      </Helmet>
      <Banner/>
      <ComicsList/>
    </>
  );
}

export default ComicsPage;