import type { GetServerSideProps } from "next";
import Head from "next/head";
import { Anchor, Text, Title } from "@mantine/core";
import Shorten from "components/Shorten/Shorten";
import { getUrlInfoFromId, Url } from "utils/requests";
import { getDate } from "utils/constants";
import { IdTitleStyle, IdWrapperStyle } from "styles/styles";

const UrlShortener = ({ data, host }: { data: Url; host?: string }) => (
  <>
    <Head>
      <title>{`Url Sortener | ${data.destination}`}</title>
    </Head>
    <div style={IdWrapperStyle}>
      <Title order={1} style={IdTitleStyle}>
        {data.destination}
      </Title>
      <time dateTime={data.created_at} style={{ marginBottom: 16 }}>
        {getDate(data.created_at)}
      </time>
      <Shorten idOnText destination={data.destination} id={data.id} host={host} />
      <Text style={{ overflowWrap: "anywhere", marginTop: 16 }}>
        <strong>Destination:</strong>{" "}
        <Anchor href={data.destination} target="_blank" rel="noreferrer">
          {data.destination}
        </Anchor>
      </Text>
    </div>
  </>
);

export default UrlShortener;

export const getServerSideProps: GetServerSideProps = async ({ query = { id: "" }, req }) => {
  const host = `${process.env.NODE_ENV === "production" ? "https" : "http"}://${req.headers.host}`;
  const idRegExp = /(.+)(\+)$/;
  const id = (query.id as string).replace(idRegExp, "$1");
  const { data } = await getUrlInfoFromId(id, host);
  if (!data) return { notFound: true };
  const shouldDisplayInfo = !!(query.id as string).match(idRegExp);
  if (shouldDisplayInfo) return { props: { data, host } };
  return { redirect: { destination: data.destination, permanent: false } };
};
