const customerPrivileges = [
  { name: "Reply", action: "reply-message", icon: "ion:reply" },
  { name: "Copy message", action: "copy-message", icon: "ion:copy" },
  { name: "Forward", action: "forward-message", icon: "ion:forward" },
];
const ownerPriviliges = [
  { name: "Reply", action: "reply-message", icon: "ion:reply" },
  { name: "Copy message", action: "copy-message", icon: "ion:copy" },
  { name: "Delete", action: "delete-message", icon: "ion:md-trash" },
  { name: "Edit", action: "edit-message", icon: "ion:edit" },
  { name: "Forward", action: "forward-message", icon: "ion:forward" },
];
const adminPrivileges = [
  { name: "Reply", action: "reply-message", icon: "ion:reply" },
  { name: "Copy message", action: "copy-message", icon: "ion:copy" },
  { name: "Delete", action: "delete-message", icon: "ion:md-trash" },
  { name: "Forward", action: "forward-message", icon: "ion:forward" },
];
export default { customerPrivileges, adminPrivileges, ownerPriviliges };
