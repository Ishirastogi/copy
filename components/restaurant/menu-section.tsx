import MenuItem from "./menu-item"

interface MenuSectionProps {
  title: string
  items: any[]
  onAddItem: (item: any) => void
}

export default function MenuSection({ title, items, onAddItem }: MenuSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-6">
     <h2 className="text-xl font-serif font-medium text-gray-800 mb-3">
        {title} <span className="text-xl text-gray-400 font-sans ml-1">({items.length})</span>
      </h2>
      <div className="flex flex-col">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} onAddItem={onAddItem} />
        ))}
      </div>
    </div>
  )
}