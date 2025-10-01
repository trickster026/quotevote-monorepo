# Username Search Test Scenarios

## ✅ Basic Functionality Tests

### Test 1: @ Symbol Detection

- [ ] Type `@` in search input
- [ ] Verify placeholder changes to "Search usernames..."
- [ ] Verify search bar gets blue border
- [ ] Verify no dropdown appears with just `@`

### Test 2: Username Search

- [ ] Type `@a` (or any letter)
- [ ] Verify dropdown appears
- [ ] Verify loading indicator shows
- [ ] Verify matching users display with avatars
- [ ] Verify usernames show as @username format

### Test 3: User Selection

- [ ] Click on a username from dropdown
- [ ] Verify dropdown closes
- [ ] Verify search input shows `@username`
- [ ] Verify posts filter to selected user only

### Test 4: Click Outside

- [ ] Type `@test` to show dropdown
- [ ] Click outside the search area
- [ ] Verify dropdown closes

### Test 5: Clear Search

- [ ] Select a user (search shows `@username`)
- [ ] Clear the search input
- [ ] Verify all filters reset
- [ ] Verify normal search behavior returns

## ✅ Integration Tests

### Test 6: Regular Search Still Works

- [ ] Type normal text (no @)
- [ ] Verify normal search functionality
- [ ] Verify posts show based on keyword search

### Test 7: Hashtag Search Still Works

- [ ] Type `#hashtag`
- [ ] Verify hashtag search works normally

### Test 8: Mixed Search

- [ ] Type `@username some text`
- [ ] Verify it treats as regular search (not username search)

## ✅ Error Handling Tests

### Test 9: No Users Found

- [ ] Type `@xyz123nonexistent`
- [ ] Verify "No users found" message appears

### Test 10: Network Error

- [ ] Disconnect internet
- [ ] Type `@test`
- [ ] Verify error handling (may need backend running)

## ✅ UI/UX Tests

### Test 11: Mobile Responsiveness

- [ ] Test on mobile/narrow screen
- [ ] Verify dropdown fits properly
- [ ] Verify touch interactions work

### Test 12: Keyboard Navigation

- [ ] Type `@test`
- [ ] Try using arrow keys in dropdown (if implemented)
- [ ] Try ESC key to close dropdown

### Test 13: Loading States

- [ ] Type `@` + letter quickly
- [ ] Verify loading indicator appears
- [ ] Verify smooth transition to results

## ✅ Performance Tests

### Test 14: Rapid Typing

- [ ] Type `@abcdefg` quickly
- [ ] Verify no duplicate requests
- [ ] Verify smooth performance

### Test 15: Large Results

- [ ] Type `@a` (common letter)
- [ ] Verify large lists handle well
- [ ] Verify scrolling works in dropdown

## 🚨 Common Issues to Check

- [ ] Console errors (check browser dev tools)
- [ ] GraphQL query errors
- [ ] Styling issues on different screen sizes
- [ ] Memory leaks (dropdown not cleaning up)
- [ ] State management issues
