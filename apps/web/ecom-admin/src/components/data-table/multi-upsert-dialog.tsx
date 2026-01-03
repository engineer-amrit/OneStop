'use client'

import { useState } from 'react'
import type { Row, Table } from '@tanstack/react-table'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import type { ApiError } from 'common'
import type { Common } from './types'

export interface Action<TDATA> {
  (selectedRows: Row<TDATA>[]): Promise<void>
}

type Props<TData extends Common> = {
  open: boolean
  onOpenChange: (open: boolean) => void,
  action: Action<TData>,
  table: Table<TData>,
  entryName: string,
  confirmWord: "DELETE" | "UPDATE"
}


export function AnyMultiUpsertDialog<TData extends Common>({
  open,
  onOpenChange,
  table,
  action,
  confirmWord,
  entryName,
}: Props<TData>) {
  const [value, setValue] = useState('')

  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleDelete = async () => {
    if (value.trim() !== confirmWord) {
      toast.error(`Please type "${confirmWord}" to confirm.`)
      return
    }

    onOpenChange(false)


    await action(selectedRows).then(() => {
      setValue('')
      table.resetRowSelection()
      toast.success(`Deleted ${selectedRows.length} ${selectedRows.length > 1 ? entryName + 's' : entryName}`)
    }).catch((e: ApiError) => {
      toast.error(e.message)
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== confirmWord}
      title={
        <span
          data-confirm={confirmWord}
          className='  data-[confirm=DELETE]:text-destructive data-[confirm=UPDATE]:text-yellow-600 '>
          <AlertTriangle
            data-confirm={confirmWord}
            className='me-1 inline-block data-[confirm=DELETE]:stroke-destructive data-[confirm=UPDATE]:stroke-yellow-600'
            size={18}
          />{' '}

          {confirmWord} {selectedRows.length}{' '}
          {selectedRows.length > 1 ? entryName + 's' : entryName}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to {confirmWord.toLowerCase()} the selected {entryName}s? <br />
            {confirmWord == "DELETE" && "This action cannot be undone."}
          </p>

          <Label className='my-4 flex flex-col items-start gap-1.5'>
            <span className=''>Confirm by typing "{confirmWord}":</span>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Type "${confirmWord}" to confirm.`}
            />
          </Label>

          {confirmWord == "DELETE" && <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>}
        </div>
      }
      confirmText={confirmWord}
      destructive={confirmWord === "DELETE"}
    />
  )
}
