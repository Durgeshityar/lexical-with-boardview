'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useModal } from '@/hooks/use-modal-store'

import { boardPlugin } from '../../plugins/board-plugin'

const formSchema = z.object({
  rows: z
    .number()
    .min(1, { message: ' 0 < number of rows < 11' })
    .max(10, { message: ' 0 < number of rows < 11' }),
  columns: z
    .number()
    .min(1, { message: ' 0 < number of columns < 11' })
    .max(10, { message: ' 0 < number of columns < 11' }),
})

const CreateBoardModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const isModalOpen = isOpen && type === 'createBoard'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rows: 1,
      columns: 1,
    },
  })

  const isLoading = form.formState.isSubmitting
  const { activeEditor } = data

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    boardPlugin(activeEditor!, values.rows, values.columns)
    onClose()
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Insert a Board
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Enter number of rows and columns
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="rows"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Rows
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number" // Change to number input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter number of rows"
                        value={field.value || ''}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="columns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Columns
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number" // Change to number input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter number of columns"
                        value={field.value || ''}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant={'default'} disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateBoardModal
