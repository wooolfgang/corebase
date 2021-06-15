import { useRouter } from 'next/router'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Users', href: '/users', current: false }
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav() {
  const router = useRouter()
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <span
                role="img"
                aria-label="stone-emoji"
                className="mx-auto h-12 w-auto text-4xl text-center"
              >
                🗿
              </span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navigation.map(item => (
                  <Link href={item.href} key={item.name}>
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        router.pathname === item.href
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={
                        router.pathname === item.href ? 'page' : undefined
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
