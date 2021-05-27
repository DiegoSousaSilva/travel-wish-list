import Main from 'components/Main'

type Props = {
  title: string
}

export default function Home({ title = 'Diego Sousa' }: Props) {
  return <Main />
}
