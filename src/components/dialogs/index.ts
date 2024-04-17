'use client'

import { Modal } from '@/ui/modal'
import { createPushModal } from 'pushmodal'
import { CreateLinkDialog } from './create-link-dialog'
import { DeleteLinkDialog } from './delete-link-dialog'
import { ExpandedLinkDialog } from './expanded-link-dialog'
import { LinkStatsDialog } from './link-stats-dialog'
import { QRCodeDialog } from './qr-code-dialog'
import { UpdateLinkDialog } from './update-link-dialog'

export const { pushModal, popModal, popAllModals, replaceWithModal, useOnPushModal, ModalProvider } = createPushModal({
  modals: {
    CreateLink: {
      Wrapper: Modal,
      Component: CreateLinkDialog,
    },
    DeleteLink: {
      Wrapper: Modal,
      Component: DeleteLinkDialog,
    },
    ExpandedLink: {
      Wrapper: Modal,
      Component: ExpandedLinkDialog,
    },
    LinkStats: {
      Wrapper: Modal,
      Component: LinkStatsDialog,
    },
    QRCode: {
      Wrapper: Modal,
      Component: QRCodeDialog,
    },
    UpdateLink: {
      Wrapper: Modal,
      Component: UpdateLinkDialog,
    },
  },
})
