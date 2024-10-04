import { FirebaseCommands } from "../../utils/page_objects/commands";
import { FirebaseSidebar } from "../../utils/page_objects/sidebar";
import { mockProject } from "../../utils/projects";
import { firebaseSuite, firebaseTest } from "../../utils/test_hooks";
import { mockUser } from "../../utils/user";

firebaseSuite("Supports opening empty projects", async function () {
  firebaseTest("opens an empty project", async function () {
    const workbench = await browser.getWorkbench();

    const sidebar = new FirebaseSidebar(workbench);
    await sidebar.openExtensionSidebar();

    const commands = new FirebaseCommands();
    await commands.waitForUser();

    await mockUser({ email: "test@gmail.com" });
    await mockProject("demo-project");

    await sidebar.runInStudioContext(async (firebase) => {
      await firebase.signInWithGoogleLink.waitForDisplayed();
    });
  });
});
