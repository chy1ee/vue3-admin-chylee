import SvgIcon from '@/components/SvgIcon'

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)

export function useSvgIcon(app) {
  app.component("SvgIcon", SvgIcon)
}