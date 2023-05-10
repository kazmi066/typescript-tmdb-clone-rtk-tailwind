import React from "react"

export const Container = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="container w-11/12 h-full mx-auto">{children}</div>
  )
}
