import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useSearch from "../hooks/useSearch";
interface SearchProps {
  search: string;
  onChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Search({ search, onChangeSearch }: SearchProps) {
  return (
    <Paper
      component="form"
      sx={{
        p: "1px 2px",
        display: "flex",
        alignItems: "center",
        borderRadius: 5,
        height: "55px",
        width: "20rem",
      }}
    >
      <InputBase
        sx={{
          ml: 2,
          flex: 1,
          color: "#e06377",
          borderRadius: 5,

          "& input::placeholder": {
            color: "#e06377",
            opacity: 1,
            fontSize: "1rem",
          },
        }}
        value={search}
        onChange={onChangeSearch}
        placeholder="Busca por palabra clave"
      />
      <IconButton type="button" sx={{ p: "10px", color: "#e06377" }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
