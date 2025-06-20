'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useOnboardUser, OnboardRequest } from '@/hooks/useOnboardUser';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useUser } from '../context/UserProvider';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectLabel } from '@radix-ui/react-select';

export default function OnboardingPage() {
    const router = useRouter();
    const user = useUser();
    const { register, handleSubmit } = useForm<OnboardRequest>();
    const { mutate: submitOnboard, isPending, error } = useOnboardUser();

    const onSubmit = (data: any) => {
        if (!user) return;
        const formatted: OnboardRequest = {
            name: user.user!.name!,
            email: user.user!.email!,
            genres: data.genres.split(',').map((g: string) => g.trim()),
            artists: data.artists.split(',').map((a: string) => a.trim()),
            experienceLevel: data.experienceLevel,
            experienceDescription: data.experienceDescription,
        };

        submitOnboard(formatted, {
            onSuccess: () => router.push('/dashboard'),
            onError: (err) => console.error('Onboarding failed:', err),
        });
    };


    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Let’s get to know you</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <Label htmlFor="genres">Preferred Genres (comma-separated)</Label>
                            <Input id="genres" {...register('genres')} placeholder="e.g. rock, blues, jazz" />
                        </div>

                        <div>
                            <Label htmlFor="artists">Favorite Artists (comma-separated)</Label>
                            <Input id="artists" {...register('artists')} placeholder="e.g. Hendrix, Clapton, Mayer" />
                        </div>

                        <Separator />

                        <div>
                            <Label htmlFor="experienceLevel">Experience Level</Label>
                            <Select {...register("experienceLevel")}>
                                <SelectTrigger id="experienceLevel">
                                    <SelectValue placeholder="Select your level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Choose your level</SelectLabel>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="experienceDescription">Tell us more</Label>
                            <Textarea
                                id="experienceDescription"
                                {...register('experienceDescription')}
                                placeholder="Played casually for 2 years, recently picking it up again."
                            />
                        </div>

                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? 'Saving...' : 'Continue'}
                        </Button>

                        {error && (
                            <p className="text-sm text-red-600 text-center">
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
