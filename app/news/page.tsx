import { NewsTable } from '@/components/NewsTable';

export default function News({ onEdit }: { onEdit?: (id: string) => void }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage News</h1>
      <NewsTable onEdit={onEdit!} />
    </div>
  );
}
