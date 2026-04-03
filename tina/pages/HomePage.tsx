import { useTina } from "tinacms/dist/react";
import type { PageQuery, PageQueryVariables } from "../__generated__/types";
import Page from "./Page";

type Props = {
  variables: PageQueryVariables;
  data: PageQuery;
  query: string;
};

const HomePage = (props: Props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data?.page;

  if (!page) {
    return <main>No page data found.</main>;
  }

  return <Page page={page} />;
};

export default HomePage;