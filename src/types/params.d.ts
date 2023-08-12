interface PropsWithParams<Params extends Record<string, string>> {
  params: Params
  searchParams: Record<string, string | string[]>
}

export type DefaultPageProps = PropsWithParams<Record<string, string>>
