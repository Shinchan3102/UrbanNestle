
import Categories from '@/components/Categories'
import Empty from '@/components/Empty';
import ListingCard from '@/components/cards/ListingCard';
import { getCurrentUser } from '@/libs/actions/getCurrentUser';
import { IListingParams, getListings } from '@/libs/actions/listings-actions';

interface Params {
  searchParams: IListingParams
}

export default async function Home({ searchParams }: Params) {
  // const isEmpty = true;

  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  return (
    <div className='main-container mx-auto flex flex-col gap-8 flex-1'>
      <Categories />

      {
        listings?.length === 0 ?
          <Empty
            showReset
          />
          :
          <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6'>
            {
              listings?.map((item) => (
                <ListingCard
                  key={item.id}
                  currentUser={currentUser}
                  data={item}
                />
              ))
            }
          </section>
      }
    </div>
  )
}
