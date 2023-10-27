import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './components/ProductCard'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import coffee from '@/public/images/coffee_c.jpg'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className='relative h-screen'>
      <h1 className='font-poppins'>Hello {session && <span>{session.user!.name}</span>}</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
      {/* 
      LAZY LOADING COMPONENTS:
      imagine you have a heavy component with a lot of markup and styling:
        
        const [isVisible, setVisible] = useState(false)
        the component should be imported dynamically for lazy loading to work:
        import dynamic from 'next/dynamic'
        const HeavyComponent = dynamic(() => import('./components/HeavyComponent'),
        can also pass a options object with two properties
        {
          ssr: false
          loading: () => <p>Loading..</p>
        })
        
        <button onClick={() => setVisible(true)}>Show</button>
        {isVisible && <HeavyComponent />} 

        EXAMPLE FOR LODASH:
        load it dynamically: 
        <button onClick={async () => {
          const x = (await import('lodash')).default
          
          const users = [
            {name: 'c'},
            {name: 'a'},
            {name: 'b'}
          ];

          const sorted = _.orderBy(users, ['name'])
          console.log(sorted)
        }}>Show</button>
      */}
        
      <Image src={coffee} alt='coffee'/>
      <Image 
        src='https://bit.ly/react-cover' 
        alt='coffee' 
        // if we want a fixed size:
        width={300} 
        height={170}
        // if we want them to be responsive, add fill (a boolean), though will look a bit squashed and not keep the aspect ration:
        //fill

        // add this to fix loss of aspect ratio: 
        // style={{ objectFit: 'cover'}}
        className ='object-cover' 

        // sizes should be added to determine how much of the viewport the image should take:
        // for background eg:
        //sizes="100vw"
        // for mobile, tablet and desktop:
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        quality={75} // between 1 - 100, default 75 but eg for background 100
        priority // a boolean, for images which should appear above else 
        />
    </main>
  )
}
// to overright the metadata exported from the root layout:
// export const metadata: Metadata = {
//   title: '...',
// }

// if need to generate the metadata dynamically, like on pages with route or query string params
// since the data will depend of what we are showing, such as a product:
// export async function generatedMetadata(): Promise<Metadata> {
//   // typically fetch a product:
//   const product = await fetch('')

//   //return a metadata object:
//   return {
//     title: 'product.title',
//     description: 'product.description'
//   }
// }


