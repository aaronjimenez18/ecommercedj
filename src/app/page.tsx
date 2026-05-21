import CartProviderWrap from '@/components/layout/cart-provider-wrap'
import HomeClient from './home-client'

export default function Page() {
  return (
    <CartProviderWrap>
      <HomeClient />
    </CartProviderWrap>
  )
}
