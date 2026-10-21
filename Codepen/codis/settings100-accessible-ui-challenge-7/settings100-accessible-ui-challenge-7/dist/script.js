class Checkbox extends React.Component {
  render() {
    const { name, label } = this.props;

    return /*#__PURE__*/(
      React.createElement("div", { className: "as-settings__checkbox as-p-base as-flex as-flex-align-center as-flex-justify-between" }, /*#__PURE__*/
      React.createElement("label", { className: "as-pr-oneHalf as-line-height-p", for: name },
      label), /*#__PURE__*/

      React.createElement("input", { className: "as-settings__checkbox-input", name: name, id: name, value: "", type: "checkbox", tabindex: "1" })));


  }}


class CheckboxGroup extends React.Component {
  render() {
    const { header, subheader } = this.props;

    return /*#__PURE__*/(
      React.createElement("article", { className: "as-mb-base" }, /*#__PURE__*/
      React.createElement("h3", { className: "as-my-none as-font-size-h4" },
      header), /*#__PURE__*/

      React.createElement("p", { className: "as-font-weight-base as-italic as-color-mono-dark" },
      subheader),


      this.props.children));


  }}


class AllCheckboxGroups extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement(CheckboxGroup, { header: "Push Notifications",
        subheader: "Get notified on your phone when:" }, /*#__PURE__*/
      React.createElement(Checkbox, { label: "There's a new post in one of your groups.", name: "new_group_post" }), /*#__PURE__*/
      React.createElement(Checkbox, { label: "Someone replies to one of your comments.", name: "new_comment_reply" }), /*#__PURE__*/
      React.createElement(Checkbox, { label: "Your sacrificial leader has a new announcement.", name: "new_sacrifice_news" }), /*#__PURE__*/
      React.createElement(Checkbox, { label: "Someone accepts an invitation to your event.", name: "accepted_invitation_event" }), /*#__PURE__*/
      React.createElement(Checkbox, { label: "You've been summoned to the Eternal Chamber for questioning.", name: "you_are_so_dead" }), /*#__PURE__*/
      React.createElement(Checkbox, { label: "Our Lord Cthulu has appeared in astral form.", name: "all_hail_astral_cthulu" })), /*#__PURE__*/

      React.createElement(CheckboxGroup, { header: "Email Alerts",
        subheader: "Receive emails to act on when:" }, /*#__PURE__*/
      React.createElement(Checkbox, { label: "Your credit card can't be processed.", name: "credit_card_error" }), /*#__PURE__*/
      React.createElement(Checkbox, { label: "New cult discounts and deals are available.", name: "new_cult_deal_alerts" }), /*#__PURE__*/
      React.createElement(Checkbox, { label: "There are approved updates from where your loved ones are being held on a joyful, safe, and indefinite vacation.", name: "they_are_fine_we_promise" }), /*#__PURE__*/
      React.createElement(Checkbox, { label: "Your account info was stolen.", name: "stolen_account_info" }), /*#__PURE__*/
      React.createElement(Checkbox, { label: "Your account info was stolen and you'll be provided with new info, along with a new address, identity, and plastic surgery. You leave at dawn. Destiny awaits.", name: "cthulu_speed_on_your_journey" })), /*#__PURE__*/

      React.createElement(CheckboxGroup, { header: "Recommendations",
        subheader: "Show items you may be interested in for:" }, /*#__PURE__*/
      React.createElement(Checkbox, { label: "New friends in the Cthulu social network.", name: "social_network_recommendations" }), /*#__PURE__*/
      React.createElement(Checkbox, { label: "New robes, knives, or sacrificial decorations.", name: "sacrificial_tool_recommendations" }), /*#__PURE__*/
      React.createElement(Checkbox, { label: "Real Estate offerings in the Promised Lands of Ever-Loving Flame.", name: "where_to_live_among_the_flames" }), /*#__PURE__*/
      React.createElement(Checkbox, { label: "Brainwashing techniques for the desperate and uncharismatic.", name: "persuade_others_for_your_sake" }), /*#__PURE__*/
      React.createElement(Checkbox, { label: "Additional insurance policies.", name: "membership_rebates" }))));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(AllCheckboxGroups, null), document.getElementById("form"));