'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { TheorySession } from '@/types/theory-session'
import { TheorySessionCard } from '@/components/ui/custom/theory-session-card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
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

const FormSchema = z.object({
  prompt: z.string().min(2, {
    message: 'Prompt must be at least 2 characters.',
  }),
})

export function TheorySessionForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { prompt: '' },
  })

  const [preview, setPreview] = useState<TheorySession | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast('Generating session...')
    try {
      const res = await fetch('/api/sessions/theory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()
      if (!res.ok || !json.isSuccess || !json.hasValue) {
        throw new Error('Failed to generate session')
      }

      setPreview(json.value)
      setModalOpen(true)
      toast.success('Session ready!')

    } catch (err: any) {
      toast.error('Error generating session', { description: err.message })
    }
  }

  async function handleUseSession() {
    if (!preview) return
    const res = await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preview),
    })

    const { id } = await res.json()
    router.push(`/practice/session/${id}`)
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-xl space-y-6"
        >
          <FormField
            name="prompt"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>What would you like to practice?</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Major scales, barre chords" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Generate Session</Button>
        </form>
      </Form>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generated Practice Session</DialogTitle>
          </DialogHeader>

          {preview && (
            <TheorySessionCard
              session={preview}
              onUseSession={handleUseSession}
              onRegenerate={() => {
                setModalOpen(false)
                setPreview(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
