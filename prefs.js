import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class GitLabIssuesPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        // Create a preferences page
        const page = new Adw.PreferencesPage();
        window.add(page);

        // Create a preferences group
        const group = new Adw.PreferencesGroup({
            title: _('GitLab Configuration'),
            description: _('Configure your GitLab server and access token'),
        });
        page.add(group);

        // GitLab URL setting
        const urlRow = new Adw.EntryRow({
            title: _('GitLab Server URL'),
        });
        urlRow.set_text(settings.get_string('gitlab-url'));
        urlRow.connect('changed', (widget) => {
            settings.set_string('gitlab-url', widget.get_text());
        });
        group.add(urlRow);

        // GitLab Token setting
        const tokenRow = new Adw.PasswordEntryRow({
            title: _('Access Token'),
        });
        tokenRow.set_text(settings.get_string('gitlab-token'));
        tokenRow.connect('changed', (widget) => {
            settings.set_string('gitlab-token', widget.get_text());
        });
        group.add(tokenRow);

        // Reports configuration group
        const reportsGroup = new Adw.PreferencesGroup({
            title: _('Reports Configuration'),
            description: _('Configure filters for monthly reports'),
        });
        page.add(reportsGroup);

        // Report tags filter setting
        const tagsFilterRow = new Adw.EntryRow({
            title: _('Tags included in reports'),
        });
        tagsFilterRow.set_text(settings.get_string('report-tags-filter'));
        tagsFilterRow.connect('changed', (widget) => {
            settings.set_string('report-tags-filter', widget.get_text());
        });
        reportsGroup.add(tagsFilterRow);

        // Help text for tags filter
        const tagsInfoLabel = new Gtk.Label({
            label: _('Leave empty to display all tags.\n' +
                   'Otherwise, enter a comma-separated list of tags or regular expressions.\n' +
                   'Examples:\n' +
                   '  • "Corrective Maintenance,Preventive Maintenance"\n' +
                   '  • "^Maintenance.*$" (all tags starting with "Maintenance")\n' +
                   '  • "Bug,^Feature.*$"\n' +
                   '\nIssues without these tags will appear as "Other" in reports.'),
            wrap: true,
            xalign: 0,
        });
        tagsInfoLabel.add_css_class('dim-label');

        const tagsInfoRow = new Adw.ActionRow();
        tagsInfoRow.set_child(tagsInfoLabel);
        reportsGroup.add(tagsInfoRow);

        // Information group
        const infoGroup = new Adw.PreferencesGroup({
            title: _('Information'),
        });
        page.add(infoGroup);

        const infoLabel = new Gtk.Label({
            label: _('To create a personal access token:\n' +
                   '1. Go to your GitLab profile\n' +
                   '2. Settings → Access Tokens\n' +
                   '3. Create a new token with "api" permissions\n' +
                   '4. Copy the token and paste it above'),
            wrap: true,
            xalign: 0,
        });
        infoLabel.add_css_class('dim-label');

        const infoRow = new Adw.ActionRow();
        infoRow.set_child(infoLabel);
        infoGroup.add(infoRow);
    }
}
