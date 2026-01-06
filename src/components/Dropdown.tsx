import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import getCategories from "../firestore/categoryService";

interface Props {
  selected: string | undefined;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<Props> = ({ selected, onChange }) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <Form.Select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </Form.Select>
  );
};

export default Dropdown;
