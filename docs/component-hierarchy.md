## Component Hierarchy

###MainSplash
- AuthFormContainer
- SignupFormContainer

###AuthFormContainer
 - AuthForm

###SignupContainer
- SignupForm

###NavbarContainer
 - DropdownContainer
 - SearchBar (bonus)

###NewsfeedMainContainer
  - NavbarContainer
  - NewPostForm
  - NewsfeedContainer
    + NewsfeedItem
  - NewsfeedSidebarContainer
  - AdspaceContainer (bonus)
    + AdspaceItem

###ProfileContainer
  - NavbarContainer
  - ProfileSidebarContainer
    + ProfileAboutContainer
    + ProfileFriendslistContainer
    + ProfilePhotosContainer (bonus)
  - TimelineContainer
    + NewPostForm
    + TimelineItem

## Routes

|Path                  | Component                |
|----------------------|--------------------------|
| Root "/"             | "MainSplashContainer"    |
| "/signup"            | "SignupContainer"        |
| "/signin"            | "AuthFormContainer"      |
| "/newsfeed"          | "NewsfeedMainContainer"  |
| "/profile/:id"       | "ProfileContainer"       |
