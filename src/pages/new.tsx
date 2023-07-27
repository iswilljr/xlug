import { Create } from '@/components/Create'
import { newXlugSchema } from '@/utils/schemas'
import { Box } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

export default function New() {
  const [, setLocalXlugs] = useLocalStorage<any[]>({ key: 'local_xlugs', defaultValue: [] })

  return (
    <Box py='md'>
      <Create
        action='/api/xlug/new'
        actionLabel='Create Xlug'
        successMessage='Successfully created your xlug'
        schema={newXlugSchema}
        onUpdate={res => setLocalXlugs(prev => [...prev, res.data])}
        initialValues={{
          xlug: '',
          destination: '',
          description: '',
        }}
      />
    </Box>
  )
}
