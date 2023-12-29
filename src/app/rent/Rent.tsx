'use client'

// import Map from "@/components/Map";
import TrackStep from "@/components/ProgressTrackers/TrackStep";
import CustomButton from "@/components/buttons/CustomButton";
import CategoryCard from "@/components/cards/CategoryCard";
import CountryCard, { CountrySelectValue } from "@/components/cards/CountryCard";
import ImageUpload from "@/components/inputs/ImageUpload";
import Input from "@/components/inputs/Input";
import SearchInput from "@/components/inputs/SearchInput";
import { formattedCountries } from "@/hooks/useCountries";
import { categories, rentingSteps } from "@/utils/constants";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgDollar } from 'react-icons/cg';

const Rent = () => {
    const router = useRouter();

    const [activeStep, setActiveStep] = useState<number>(1);
    const [searchInput, setSearchInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');
    const description = watch('description');
    const title = watch('title');
    const price = watch('price');

    const Map = useMemo(() => dynamic(() => import('@/components/Map'), {
        ssr: false
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onNext = () => {
        setActiveStep((prev) => prev + 1);
    }

    const onBack = () => {
        if (activeStep === 1) {
            return;
        }
        setActiveStep((prev) => prev - 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (activeStep !== 6) {
            onNext();
            return;
        }
        setIsLoading(true);

        try {
            const res = await axios.post('/api/listings', data);

            if (res.status === 200) {
                toast.success('successfully added listing!');
                router.push('/');
                router.refresh();
                reset();
            }

        } catch (error: any) {
            console.log('error' + error);
            toast.error(`Error in creating listing ${error?.message}`)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className='flex flex-col container mx-auto py-8 pt-12 flex-1'>
            <div className="flex w-full justify-center px-6">
                <TrackStep
                    activeStep={activeStep}
                    steps={rentingSteps}
                />
            </div>

            <div className="mt-16 px-4 md:px-0 flex gap-6 flex-1">
                {/* banner section  */}
                <div className="bg-neutral-200 lg:min-w-[450px] max-w-xl hidden lg:block rounded-md">

                </div>

                <div className="flex flex-col gap-6 flex-1">
                    <h1 className="font-semibold text-2xl">
                        {rentingSteps[activeStep - 1].description}
                    </h1>
                    <h3 className="text-lg text-neutral-500">
                        {rentingSteps[activeStep - 1]?.subDescription}
                    </h3>

                    {/* fetching steps  */}
                    {/* step 1  */}
                    {
                        activeStep === 1 &&
                        <div className="grid grid-cols-2 gap-3 md:gap-6 sm:grid-cols-3 xl:grid-cols-5">
                            {
                                categories.map((item) => (
                                    <CategoryCard
                                        key={item.label}
                                        label={item.label}
                                        description={item.description}
                                        Icon={item.icons}
                                        selected={category === item.label}
                                        onClick={(category: string) => { setCustomValue('category', category) }}
                                    />
                                ))
                            }
                        </div>
                    }

                    {/* step 2 */}
                    {
                        activeStep === 2 &&
                        <>
                            <SearchInput
                                placeholder={'Search your place'}
                                value={searchInput}
                                onChange={(value: string) => setSearchInput(value)}
                            />
                            {
                                location &&
                                <div className="grid grid-cols-2 gap-3 md:gap-6 sm:grid-cols-3 xl:grid-cols-5">
                                    <CountryCard
                                        value={location}
                                        selected={true}
                                        onClick={(value: CountrySelectValue) => { }}
                                    />
                                </div>
                            }
                            <div className="grid grid-cols-2 gap-3 md:gap-6 sm:grid-cols-3 xl:grid-cols-5 max-h-[40vh] overflow-y-auto">

                                {
                                    formattedCountries
                                        .filter((item) => (location ? item.label !== location.label : true) && (item.label.toLowerCase().includes(searchInput?.toLowerCase()) || item.region.toLowerCase().includes(searchInput?.toLowerCase()) || item.value.toLowerCase().includes(searchInput?.toLowerCase())))
                                        .map((item) => (
                                            <CountryCard
                                                key={item.label}
                                                value={item}
                                                selected={false}
                                                onClick={(value: CountrySelectValue) => { setCustomValue('location', value); setSearchInput('') }}
                                            />
                                        ))
                                }
                            </div>
                            <Map
                                center={location?.latlng}
                            />
                        </>
                    }

                    {/* step 3  */}
                    {
                        activeStep === 3 &&
                        <div className="flex flex-col gap-6">
                            <Input
                                id="guestCount"
                                label="Guest Count"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                type="number"
                            />
                            <Input
                                id="roomCount"
                                label="Room Count"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                type="number"
                            />
                            <Input
                                id="bathroomCount"
                                label="Bathroom Count"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                type="number"
                            />
                        </div>
                    }

                    {/* step 4 */}
                    {
                        activeStep === 4 &&
                        <div className="">
                            <ImageUpload
                                value={imageSrc}
                                onChange={(value: string) => setCustomValue('imageSrc', value)}
                            />
                        </div>
                    }

                    {/* step 5 */}
                    {
                        activeStep === 5 &&
                        <div className="flex flex-col gap-6">
                            <Input
                                id="title"
                                label="Title"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                            />
                            <Input
                                id="description"
                                label="Description"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                            />
                        </div>
                    }

                    {/* step 6 */}
                    {
                        activeStep === 6 &&
                        <div className="flex flex-col gap-4">
                            <Input
                                id="price"
                                label="Price"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                hasIcon
                                Icon={CgDollar}
                                type="number"
                            />
                        </div>
                    }

                    <div className="flex items-center gap-4">
                        <div className={`${activeStep === 1 ? 'hidden' : 'flex-1'}`}>
                            <CustomButton
                                btnText="Back"
                                onClick={onBack}
                                variant="ghost"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="flex-1">
                            <CustomButton
                                btnText={activeStep === 6 ? 'Create' : "Next"}
                                onClick={handleSubmit(onSubmit)}
                                variant="default"
                                disabled={
                                    (activeStep === 1 && category === '') ||
                                    (activeStep === 2 && location === null) ||
                                    (activeStep === 3 && (guestCount === '' || roomCount === '' || bathroomCount === '')) ||
                                    (activeStep === 4 && imageSrc === '') ||
                                    (activeStep === 5 && (description === '' || title === '')) ||
                                    (activeStep === 6 && price === '') ||
                                    isLoading
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Rent