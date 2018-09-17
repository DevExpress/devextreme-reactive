import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <Link
    to="/"
  >
    {siteTitle}
  </Link>
)

export default Header
