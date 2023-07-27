import { Anchor, Center, createStyles, Text } from '@mantine/core'
import Link from 'next/link'

const useStyles = createStyles(theme => ({
  icon: {
    display: 'flex',
    width: 25,
    height: 25,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: theme.colors.blue[7],
  },
}))

export function IconLogo() {
  const { classes } = useStyles()

  return (
    <div className={classes.icon}>
      <svg fill='#fff' width='55%' viewBox='0 0 80 80.005'>
        <g transform='matrix(.88894 0 0 .88894 -4.451 -4.434)'>
          <path
            xmlns='http://www.w3.org/2000/svg'
            d='M50.912 12.546 38.968 24.492a25.884 25.884 0 0 0 .002 36.533 26.143 26.143 0 0 0 1.84 1.672 4.501 4.501 0 0 0 5.746-6.929c-.445-.37-.845-.732-1.22-1.107a16.868 16.868 0 0 1-.002-23.805l11.941-11.942a16.83 16.83 0 0 1 23.8 23.801l-5.12 5.122a4.5 4.5 0 0 0 6.364 6.366l5.121-5.122a25.832 25.832 0 0 0-36.528-36.535Z'
          />
          <path
            xmlns='http://www.w3.org/2000/svg'
            d='M59.186 37.32a4.501 4.501 0 0 0-5.644 7.014 13.996 13.996 0 0 1 1.11 1.007 16.85 16.85 0 0 1 0 23.803l-11.94 11.942A16.83 16.83 0 1 1 18.91 57.284l5.17-5.171a4.5 4.5 0 0 0-6.363-6.367l-5.173 5.174a25.832 25.832 0 0 0 36.531 36.533L61.016 75.51a25.851 25.851 0 0 0 .002-36.534 22.973 22.973 0 0 0-1.832-1.656Z'
          />
        </g>
      </svg>
    </div>
  )
}

export function Logo() {
  return (
    <Anchor component={Link} href='/' unstyled>
      <Center>
        <IconLogo />
        <Text lh={1} ml={8} mb={4} weight='bold' size='xl'>
          xlug
        </Text>
      </Center>
    </Anchor>
  )
}
