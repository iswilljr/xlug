interface PropsWithParams<Params extends Record<string, string>> {
  params: Promise<Params>
  searchParams: Promise<Record<string, string | string[]>>
}

export type DefaultPageProps = PropsWithParams<Record<string, string>>
