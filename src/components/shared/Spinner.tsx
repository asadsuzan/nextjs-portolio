import { Loader2 } from 'lucide-react'
import React from 'react'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-blue-500">
    <Loader2 className="w-12 h-12 animate-spin" />
    <span className="ml-3 text-lg font-medium">Processing...</span>
  </div>
  )
}

export default Spinner