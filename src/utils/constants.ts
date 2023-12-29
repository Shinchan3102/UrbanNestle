import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi'
import { MdOutlineCategory, MdOutlineVilla, MdPlace } from 'react-icons/md'
import { BsSnow } from 'react-icons/bs'
import { FaImages, FaSkiing } from 'react-icons/fa';
import { IoDiamond, IoPricetag } from 'react-icons/io5';
import { GrInfo } from 'react-icons/gr';
import { BiSolidDetail } from 'react-icons/bi';

export const menuItems = [
    {
        name: 'My trips',
        redirectTo: '/trips'
    },
    {
        name: 'My favorites',
        redirectTo: '/favorites'
    },
    {
        name: 'My reservations',
        redirectTo: '/reservations'
    },
    {
        name: 'My properties',
        redirectTo: '/properties'
    },
];


export const categories = [
    {
        label: 'Beach',
        icons: TbBeach,
        description: 'This property is close to the beach'
    },
    {
        label: 'Windmills',
        icons: GiWindmill,
        description: 'This property is close to the windmills'
    },
    {
        label: 'Modern',
        icons: MdOutlineVilla,
        description: 'This property is close to the windmills'
    },
    {
        label: 'Countryside',
        icons: TbMountain,
        description: 'This property is close to the windmills'
    },
    {
        label: 'Pools',
        icons: TbPool,
        description: 'This property is close to the windmills'
    },
    {
        label: 'Islands',
        icons: GiIsland,
        description: 'This property is close to the windmills'
    },
    {
        label: 'Lake',
        icons: GiBoatFishing,
        description: 'This property is close to the windmills'
    },
    {
        label: 'Skiing',
        icons: FaSkiing,
        description: 'This property is close to the windmills'
    },
    {
        label: 'Castles',
        icons: GiCastle,
        description: 'This property is close to the windmills'
    },
    {
        label: 'Camping',
        icons: GiForestCamp,
        description: 'This property is close to the windmills'
    },
    {
        label: 'Arctic',
        icons: BsSnow,
        description: 'This property is close to the windmills'
    },
    {
        label: 'Cave',
        icons: GiCaveEntrance,
        description: 'This property is close to the windmills'
    },
    {
        label: 'Desert',
        icons: GiCactus,
        description: 'This property is close to the windmills'
    },
    {
        label: 'Barns',
        icons: GiBarn,
        description: 'This property is close to the windmills'
    },
    {
        label: 'Lux',
        icons: IoDiamond,
        description: 'This property is close to the windmills'
    },
]


export const rentingSteps = [
    {
        id: 1,
        label: 'Category',
        description: 'Which of these best describes your place?',
        subDescription: 'Pick one of the following',
        icon: MdOutlineCategory,
    },
    {
        id: 2,
        label: 'Location',
        description: 'Which is your place located?',
        subDescription: 'Help guests find you!',
        icon: MdPlace,
    },
    {
        id: 3,
        label: 'Info',
        description: 'Share some basics about your place',
        subDescription: 'What amenities do you have?',
        icon: GrInfo,
    },
    {
        id: 4,
        label: 'Images',
        description: 'Add images of your place',
        subDescription: "Show guests what your place looks like!",
        icon: FaImages,
    },
    {
        id: 5,
        label: 'Description',
        description: 'Why your place is best to choose?',
        subDescription: 'Short and sweet works best!',
        icon: BiSolidDetail,
    },
    {
        id: 6,
        label: 'Price',
        description: 'Set your price',
        subDescription: 'Add charges per night!',
        icon: IoPricetag,
    },
]