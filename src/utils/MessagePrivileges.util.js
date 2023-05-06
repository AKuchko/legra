const customerPrivileges = [
  { name: "Reply", action: "reply-message" },
  { name: "Copy message", action: "copy-message" },
  { name: "Forward", action: "forward-message" },
];
const ownerPriviliges = [
  { name: "Reply", action: "reply-message" },
  { name: "Copy message", action: "copy-message" },
  { name: "Delete", action: "delete-message" },
  { name: "Edit", action: "edit-message" },
  { name: "Forward", action: "forward-message" },
];
const adminPrivileges = [
  { name: "Reply", action: "reply-message" },
  { name: "Copy message", action: "copy-message" },
  { name: "Delete", action: "delete-message" },
  { name: "Forward", action: "forward-message" },
];
export default { customerPrivileges, adminPrivileges, ownerPriviliges };
