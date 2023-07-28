import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { Anchor, createStyles, Text, Title } from '@mantine/core'
import { buttonVariants } from '@/ui/button'

const useStyles = createStyles(theme => ({
  container: {
    position: 'relative',
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundContainer: {
    position: 'absolute',
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: -9,
  },
  notFound: {
    color: theme.colors.gray[7],
    margin: 0,
    lineHeight: 1,
    opacity: '.5',
    fontSize: '28rem',
    filter: 'blur(4px)',
    [theme.fn.smallerThan('md')]: {
      fontSize: '18rem',
    },
    [theme.fn.smallerThan('sm')]: {
      fontSize: '14rem',
    },
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'Center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  content: {
    color: theme.white,
    display: 'flex',
    width: 320,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
  },
  title: {
    fontSize: theme.fontSizes.xl,
    margin: '0.5rem',
  },
  description: {
    textAlign: 'center',
    fontSize: theme.fontSizes.xs,
  },
}))

export default function NotFound() {
  const { classes } = useStyles()

  return (
    <div className={classes.container}>
      <NextSeo title='Not found' />
      <div className={classes.notFoundContainer}>
        <h1 className={classes.notFound}>404</h1>
      </div>
      <div className={classes.body}>
        <div className={classes.content}>
          <Title className={classes.title}>Looks like you are lost</Title>
          <Text className={classes.description}>
            If you&#39;ve landed on this page from a link on the website, please{' '}
            <Anchor color='blue.9' href='https://github.com/iswilljr/xlug/issues/new' target='_blank' rel='noreferrer'>
              create an issue
            </Anchor>
            .
          </Text>
        </div>
        <Link className={buttonVariants()} href='/'>
          Go Home
        </Link>
      </div>
    </div>
  )
}

NotFound.layoutProps = {
  hidden: true,
}
