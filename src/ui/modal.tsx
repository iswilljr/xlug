import { createResponsiveWrapper } from 'pushmodal'
import { Dialog, DialogContent } from '@/ui/dialog'
import { Drawer, DrawerContent } from '@/ui/drawer'

const { Wrapper: Modal, Content } = createResponsiveWrapper({
  desktop: {
    Wrapper: Dialog,
    Content: DialogContent,
  },
  mobile: {
    Wrapper: Drawer,
    Content: DrawerContent,
  },
  breakpoint: 640,
})

const ModalContent: React.FC<React.ComponentPropsWithoutRef<typeof DialogContent>> = Content

export { Modal, ModalContent }
