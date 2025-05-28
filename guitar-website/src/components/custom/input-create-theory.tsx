'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { TheorySession } from '@/types/theory-session'
import { TheorySessionCard } from '@/components/custom/theory-session-card'
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
import { Switch } from '@/components/ui/switch'

const theoryFormSchema = z.object({
    prompt: z.string(),
    sessionMinutes: z
        .number()
        .min(1, { message: 'Session duration must be at least 1 minute' })
        .max(120, { message: 'Session duration must be at most 120 minutes' }),
    usePreviousSessions: z.boolean().optional(),
})

type TheoryFormSchema = z.infer<typeof theoryFormSchema>;

export function TheorySessionForm() {
    const form = useForm<TheoryFormSchema>({
        resolver: zodResolver(theoryFormSchema),
        defaultValues: {
            prompt: '',
            sessionMinutes: 30,
            usePreviousSessions: false,
        },
    });


    const [preview, setPreview] = useState<TheorySession | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const router = useRouter()

    async function onSubmit(data: z.infer<typeof theoryFormSchema>) {
        const promise = fetch('/api/sessions/theory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        toast.promise(promise, {
            loading: 'Generating session...',
            success: 'Session generated successfully!',
            error: 'Error generating session',
        })
        try {
            const res = await promise;

            const json = await res.json()
            if (!res.ok || !json.isSuccess || !json.hasValue) {
                throw new Error('Failed to generate session')
            }

            setPreview(json)
            setModalOpen(true)

        } catch (error: unknown) {
            if (error instanceof Error) {
                return console.log('An unknown error occurred: ', error);
            } else {
                return console.log('An unknown error occurred: ', error);
            }
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
                    <FormField
                        name="sessionMinutes"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Session Duration (minutes)</FormLabel>
                                <FormControl>
                                    <Input type="number" min={1} max={120} {...field}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="usePreviousSessions"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <FormLabel>Use Previous Sessions</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Generate Session</Button>
                </form>
            </Form >

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
