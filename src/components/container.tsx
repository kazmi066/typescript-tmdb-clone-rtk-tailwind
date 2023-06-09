import React from "react"

export const Container = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="max-w-6xl h-full mx-auto px-6">{children}</div>
  )
}
