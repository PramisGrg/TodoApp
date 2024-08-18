import { TTodo } from "../types";

type Props = {
  list: TTodo;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
};
const TodoCard = ({ list, handleDelete, handleEdit }: Props) => {
  return (
    <div className="bg-slate-100 p-6 rounded-lg">
      <div>
        <h3 className="text-xl font-bold">{list.title}</h3>
        <p>{list.description}</p>
        <div className="space-x-1 pt-2">
          <button
            className="bg-red-300 p-2 rounded-lg text-white px-[10px]"
            onClick={() => {
              handleDelete(list.id);
            }}
          >
            Delete
          </button>
          <button
            className="bg-green-300 p-2 rounded-lg text-white px-[10px]"
            onClick={() => {
              handleEdit(list.id);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
