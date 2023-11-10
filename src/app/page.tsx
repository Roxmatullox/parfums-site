import Button from '@mui/material/Button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rzzzy parfums',
  description: 'Parfums',
}

const page = () => {
  return (
    <main id="home">
      <div className="container">
        <div className="get-started">
          <Button color='secondary' variant='contained' href="/user">Get started</Button>
        </div>
      </div>
    </main>
  )
}

export default page