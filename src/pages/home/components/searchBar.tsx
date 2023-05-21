import React, { useEffect, useRef, useState } from "react"

export const SearchBar = ({ setSearch } : { setSearch: React.Dispatch<React.SetStateAction<string>> }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const initial = useRef(true)

  useEffect(() => {
    if (initial.current) {
      initial.current = false
      return
    }
    const searchDebounce = setTimeout(() => {
      setSearch(searchQuery)
    }, 500);

    return () => clearTimeout(searchDebounce)
  }, [setSearch, searchQuery])

  return (
    <div className="flex items-center justify-center gap-2 mt-14 mb-2">
      <input
        type="text"
        placeholder="Search any movie"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded ring-1 ring-[#18264a] bg-transparent border-[#18264a] text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
    </div>
  )
}
