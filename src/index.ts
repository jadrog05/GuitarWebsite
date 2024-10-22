const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const button = document.getElementById("new-task-button") as HTMLButtonElement | null

form?.addEventListener("submit", e => {
  e.preventDefault();

  if(button === null){
    throw new Error("Could nto find button");
  }
  button!.textContent = input?.value ?? null

})
