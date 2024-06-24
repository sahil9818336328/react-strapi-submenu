import React, { useRef } from 'react'
import sublinks from './data'
import { useGlobalContext } from './context'

const Submenu = () => {
  const { pageId, setPageId } = useGlobalContext()

  const currentPage = sublinks?.find((item) => item.pageId === pageId)

  const submenuContainer = useRef()

  const handleMouseLeave = (e) => {
    const submenu = submenuContainer.current
    const { left, right, bottom } = submenu.getBoundingClientRect()
    const { clientX, clientY } = e

    if (clientX < left - 1 || clientX > right - 1 || clientY > bottom - 1) {
      setPageId(null)
    }
  }

  return (
    <div
      className={currentPage ? 'submenu show-submenu' : 'submenu'}
      onMouseLeave={handleMouseLeave}
      ref={submenuContainer}
    >
      <h5>{currentPage?.page}</h5>
      <div
        className='submenu-links'
        style={{
          gridTemplateColumns:
            currentPage?.links.length > 2 ? '1fr 1fr' : '1fr',
        }}
      >
        {currentPage?.links?.map((link) => {
          const { id, url, label, icon } = link

          return (
            <a href={url} key={id}>
              {icon}
              {label}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Submenu
