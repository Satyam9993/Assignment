import { Box, Modal } from '@mui/material'
import React from 'react'

const CustomModal = ({ open, setOpen, setRoute, Component, showAlert }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 rounded-[10px] shadow p-4 outline-none">
        <Component setOpen={setOpen} setRoute={setRoute} showAlert={showAlert} />
      </Box>
    </Modal>
  )
}

export default CustomModal
